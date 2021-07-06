import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    notes: [],
    editableNote: null
  },
  getters: {
    getNotes: s => s.notes,
    getEditableNote: s => s.editableNote
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes
    },
    ADD_NOTE(state, note) {
      state.notes.unshift(note)
    },
    UPDATE_NOTE(state, editedNote) {
      state.notes = state.notes.map(note => {
        if(note.id === editedNote.id) {
          note = {...editedNote}
        }
        return note;
      })
    },
    SET_EDITABLE_NOTE(state, note) {
      state.editableNote = note
    },
    DROP_EDITABLE_NOTE(state) {
      state.editableNote = null
    },
    DELETE_NOTE(state, id) {
      state.notes = state.notes.filter(n => n.id !== id);
    }
  },
  actions: {
    fetchNotes({commit}) {
      const notes = JSON.parse(localStorage.getItem('notes')) || []
      commit('SET_NOTES', notes);
    },
    saveNotes({state}) {
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    fetchEditableNote({commit, state}, id) {
      const note = state.notes.find(n => n.id === id);
      commit('SET_EDITABLE_NOTE', note)
    }
  }
})

export default store;