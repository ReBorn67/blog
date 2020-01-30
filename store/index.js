// import login from './modules/login'

export const modules = () => ({
  login
})

export const state = () => ({
  sideMenus: []
})

export const mutations = {
  setSideMenus (state, payload) {
    if (typeof payload !== 'undefined') {
      if (payload === false) {
        state.sideMenus = [];

      } else if (JSON.stringify([payload]) !== JSON.stringify(state.sideMenus)) {
        state.sideMenus = [];
        state.sideMenus.push(payload);
      }
    }
  }
}

export const actions = {
}
