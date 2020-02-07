import deepmerge from 'deepmerge';

// import login from './modules/login'

export const modules = () => ({
  // login
});

export const state = () => ({
  sideMenus: [],
  posts: {},
  commnets: {},
  tags: {},

  checkObj: {
    posts: false,
    commnets: false,
    tags: false
  }
});

export const mutations = {
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

    componentsArr = routes.filter((item) => { return item.path.match(/\//g).length > 1; });

    componentsArr.forEach(function (item, index) {
      item.component().then((data) => {
        data._id = item.component.name;
        data.path = item.path;

        let object = {
          _id: item.component.name,
          title: data.title,
          path: item.path,
          tags: data.tag,
          timestamp: data.timestamp
        };

        if (object.timestamp) {
          commit('setPosts', object);
        }

        if (object.tags) {
          commit('setTags', object);
        }

        count++;

        if (count == componentsArr.length) {
          commit('setCheckObj', {key: 'posts', value: true});
          // commit('setCheckObj', {key: 'commnets', value: true});
          commit('setCheckObj', {key: 'tags', value: true});
        }
      });
    });
  },
  setTags ({ state, commit }, routes) {
    let componentsArr = {};
    let count = 0;

    componentsArr = routes.filter((item) => { return item.path.match(/\//g).length > 1; });

    componentsArr.forEach(function (item, index) {
      item.component().then((data) => {
        let object = {
          _id: item.component.name,
          title: data.title,
          path: item.path,
          tags: data.tag,
          timestamp: data.timestamp
        };

        if (data.tag) {
          data._id = item.component.name;
          data.path = item.path;

          commit('setTags', data);
        }

        count++;

        if (count == componentsArr.length) {
          commit('setCheckObj', {key: 'tags', value: true});
        }
      });
    });
  },
  getTags ({ state, commit }, key) {
    let result = {
      check: state.checkObj.tags,
      tags: state.tags
    }

    return result;
  }
};