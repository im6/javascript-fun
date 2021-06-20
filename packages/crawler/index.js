const fs = require("fs");
const async = require("async");

const collectGit = require("./task/git");
const collectSite = require("./task/site");

const { npm_package_config_gitJsonPath, npm_package_config_siteJsonPath } =
  process.env;

async.parallel(
  [
    (cb) => {
      collectSite((err0, data) => {
        if (err0) {
          // mysql connection error will be caught here
          cb(err0);
        } else {
          fs.writeFile(
            npm_package_config_siteJsonPath,
            JSON.stringify(data),
            (err1) => {
              cb(err1);
            }
          );
        }
      });
    },
    (cb) =>
      collectGit((err0, data) => {
        fs.writeFile(
          npm_package_config_gitJsonPath,
          JSON.stringify(data),
          (err1) => {
            cb(err0 || err1);
          }
        );
      }),
  ],
  (err) => {
    if (err) {
      console.error("\nJob failed.", err); // eslint-disable-line no-console
      process.exit(1);
    } else {
      console.log("\nJob success!"); // eslint-disable-line no-console
      process.exit();
    }
  }
);
