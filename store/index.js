// import login from './modules/login'

export const modules = () => ({
  login
})

export const state = () => ({
  sideMenus: []
})

export const mutations = {
  setSideMenus (state, payload) {
    state.sideMenus = [];

    if (typeof payload !== 'undefined' && payload !== false) {
      state.sideMenus.push(payload);
    }
  }
}

export const actions = {
}
