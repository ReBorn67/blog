import deepmerge from 'deepmerge';

import routesMeta from './routesMeta'

export const modules = () => ({
  routesMeta
});

export const state = () => ({
  menus: {},
  sideMenus: [],

  posts: {},
  commnets: {},
  tags: {},

  checkObj: {
    posts: false,
    commnets: false,
    tags: false
  },

  pageSize: 15,
  pageLeftSize: 2,
  pageRightSize: 2,
});

export const mutations = {
  setMenus (state, menus) {
    state.menus = menus;
  },
  setCheckObj (state, options) {
    let key   = options.key;
    let value = options.value;

    state.checkObj[key] = value;
  },
  setSideMenus (state, payload) {
    if (typeof payload !== 'undefined') {
      if (payload === false) {
        state.sideMenus = [];

      } else if (JSON.stringify([payload]) !== JSON.stringify(state.sideMenus)) {
        state.sideMenus = [];
        state.sideMenus.push(payload);
      }
    }
  },
  setPosts (state, object) {
    let timestamp = object.timestamp;

    if (typeof state.posts[timestamp] == 'undefined') {
      state.posts[timestamp] = [];
    }

    state.posts[timestamp].push(object);

    /* 중복제거 */
    let tmp = [];
    state.posts[timestamp] = state.posts[timestamp].reduce((array, object) => {
      let json = JSON.stringify(object);

      if (tmp.indexOf(json) < 0) {
        tmp.push(json);
        array.push(object);
      }

      return array;
    }, []);

    /* 정렬 */
    let tmpPosts = {};
    let postKeys = Object.keys(state.posts);

    postKeys.sort((a, b) => { return Date.parse(b) - Date.parse(a); });
    postKeys.map((key, index) => { tmpPosts[key] = state.posts[key]; });

    state.posts = tmpPosts;
  },
  setTags (state, object) {
    let tags = object.tags.split(',');

    tags.map(function (tag) {
      if (typeof state.tags[tag] == 'undefined') {
        state.tags[tag] = [];
      }

      state.tags[tag].push(object);

      /* 중복제거 */
      let tmp = [];
      state.tags[tag] = state.tags[tag].reduce((array, object) => {
        let json = JSON.stringify(object);

        if (tmp.indexOf(json) < 0) {
          tmp.push(json);
          array.push(object);
        }

        return array;
      }, []);
    });
  }
};

export const getters = {
  menus (state) {
    return state.menus;
  },
  sideMenus (state) {
    return state.sideMenus;
  },

  posts (state) {
    return state.posts;
  },
  commnets (state) {
    return state.commnets;
  },
  tags (state) {
    return state.tags;
  }
};

export const actions = {
  setPCT ({ state, commit }, routes) {
    let componentsArr = {};
    let count = 0;

    let routesMeta = state.routesMeta.metas;

    componentsArr = routes.filter((item) => { return item.path.match(/\//g).length > 1; });

    componentsArr.forEach(function (item, index) {
      let split = item.name.split('-');

      let routeMeta = deepmerge([], routesMeta);

      split.forEach(function(path, index) {
        if (typeof routeMeta[path] !== 'undefined') {
          routeMeta = routeMeta[path];
        } else {
          routeMeta = false;
          return false;
        }

        if (index + 1 == split.length && typeof routeMeta.title === 'undefined') {
          routeMeta = false;
        }
      });

      if (routeMeta) {
        let object = {
          _id: item.component.name,
          title: routeMeta.title,
          path: item.path,
          tags: routeMeta.tags,
          timestamp: routeMeta.timestamp
        };

        if (object.timestamp) {
          commit('setPosts', object);
        }

        if (object.tags) {
          commit('setTags', object);
        }
      }

      count++;

      if (count == componentsArr.length) {
        commit('setCheckObj', {key: 'posts', value: true});
        // commit('setCheckObj', {key: 'commnets', value: true});
        commit('setCheckObj', {key: 'tags', value: true});
      }
    });
  },
  getTags ({ state, commit }, key) {
    let result = {
      check: state.checkObj.tags,
      tags: state.tags
    }

    return result;
  },
  getPCT ({ state, commit }, type, key) {
    let result = {
      check: state.checkObj[type],
      datas: state[type]
    }

    return result;
  }
};