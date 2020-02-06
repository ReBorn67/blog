import deepmerge from 'deepmerge';

// import login from './modules/login'

export const modules = () => ({
  login
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
  setTags (state, payload) {
    let title     = payload.title;
    let path      = payload.path;
    let tags      = payload.tag.split(',');
    let timestamp = payload.timestamp;

    let object = {
      title: title,
      path: path,
      tags: tags,
      timestamp: timestamp
    };

    tags.map(function (tag) {
      if (typeof state.tags[tag] == 'undefined') {
        state.tags[tag] = [];
      }

      state.tags[tag].push(object);

      /* 중복제거 */
      let tmp = [];
      state.tags[tag] = state.tags[tag].reduce(function(a,b){
        let jb = JSON.stringify(b);

        if (tmp.indexOf(jb) < 0) {
          tmp.push(jb);
          a.push(b);
        }

        return a;
      }, []);
    });
  },
  getTags (state, key) {
    if (key) return state.tags[key];

    return state.tags;
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
  setTags ({ state, commit }, routes) {
    let componentsArr = {};

    componentsArr = routes.filter((item) => { return item.path != '/' });

    componentsArr.forEach(function (item, index) {
      let path = item;

      item.component().then((value) => {
        if (value.tag) {
          value._id = item.component.name;
          value.path = item.path;
          commit('setTags', value);
        }
      });
    });
  },
  async getTags ({ state, commit }, key) {
    // return await commit('getTags', key);
    return state.tags;
  }
};