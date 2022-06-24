/* eslint-disable camelcase */
const shared = {
  ReturnConsumedCapacity: 'TOTAL',
};

const convertCategoryToPutRequest = (cate) => {
  const jsfun_category = cate.map((v) => {
    const newItem = {
      id: {
        N: v.id.toString(),
      },
      name: {
        S: v.name,
      },
      page: {
        N: (v.page - 1).toString(),
      },
    };
    if (v.sort) {
      newItem.sort = {
        N: v.sort.toString(),
      };
    }
    if (v.icon) {
      newItem.icon = {
        S: v.icon,
      };
    }
    return {
      PutRequest: {
        Item: newItem,
      },
    };
  });

  const params = {
    RequestItems: {
      jsfun_category,
    },
    ...shared,
  };

  return params;
};

const convertGithubToPutRequest = (gits) => {
  const jsfun_git = gits.map((v) => {
    const newItem = {
      github: {
        S: v.github,
      },
      category: {
        N: v.grp.toString(),
      },
    };
    if (v.name) {
      newItem.name = {
        S: v.name,
      };
    }
    if (v.img) {
      newItem.img = {
        S: v.img,
      };
    }
    return {
      PutRequest: {
        Item: newItem,
      },
    };
  });

  const params = {
    RequestItems: {
      jsfun_git,
    },
    ...shared,
  };

  return params;
};

const convertSiteToPutRequest = (sites) => {
  const jsfun_site = sites.map((v) => {
    const newItem = {
      url: {
        S: v.url,
      },
      name: {
        S: v.name,
      },
      category: {
        N: v.grp.toString(),
      },
    };
    if (v.desc) {
      newItem.desc = {
        S: v.desc,
      };
    }
    return {
      PutRequest: {
        Item: newItem,
      },
    };
  });

  const params = {
    RequestItems: {
      jsfun_site,
    },
    ...shared,
  };

  return params;
};

module.exports = {
  convertSiteToPutRequest,
  convertGithubToPutRequest,
  convertCategoryToPutRequest,
};
