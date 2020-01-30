// import login from './modules/login'

export const modules = () => ({
  login
})

export const state = () => ({
  sideMenus: []
})

export const mutations = {
  setSideMenus (state, payload) {
    if (typeof payload !== 'undefined' && payload !== false) {
      if (JSON.stringify([payload]) !== JSON.stringify(state.sideMenus)) {
        state.sideMenus = [];
        state.sideMenus.push(payload);
      }
    }
  }
}

export const actions = {
}
