const key = "cards";
function saveListInStore(list) {
  localStorage.setItem(key, JSON.stringify(list));
}

const state = {
  list: []
};
const getters = {
  getList(state) {
    return state.list;
  },
  getItem(state) {
    return state.item;
  }
};
const mutations = {
  updateItem(state, item) {
    let index = state.list.findIndex(i => i.id === item.id);
    if (index > 0) {
      state.list[index] = item;
    }
    saveListInStore(state.list);
  },
  createItem(state, item) {
    state.list.unshift({
      tasks: [],
      status: 0,
      ...item,
      id: state.list.length
    });
    saveListInStore(state.list);
  },
  setList(state, list) {
    state.list = list;
  }
};
const actions = {
  createItem({ commit }, item) {
    commit("createItem", item);
  },
  updateItem({ commit }, item) {
    commit("updateItem", item);
  },
  getList({ commit }) {
    let list = localStorage.getItem(key);
    if (list) {
      commit("setList", JSON.parse(list));
    }
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
