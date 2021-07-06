<template>
  <div class="content">
    <div class="notes">
      <note-item 
        v-for="note, noteIdx in notes"
        :key="note.id"
        :noteIdx="noteIdx"
        :note="note"
        @onEdit="editNote"
        @onDelete="removeNote"
      />
      <div class="add-note notes__item">
        <plus-svg @click="toggleAddNoteModal" />
      </div>

      <div class="no-notes" v-if="!notes.length">
        <h2 class="no-notes__title">Пока нет ни одной заметки...</h2>
        <h3 class="no-notes__subtitle">Добавьте первую!</h3>
      </div>
    </div>

    <add-note-modal
      :isActive="showAddNoteModal"
      @onClose="toggleAddNoteModal"
    />
  </div>
</template>

<script>
import PlusSvg from '@/assets/icons/plus.svg'
import NoteItem from '@/components/NoteItem'
import AddNoteModal from '@/components/AddNoteModal'
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  components: { PlusSvg, NoteItem, AddNoteModal },
  data() {
    return {
      showAddNoteModal: false
    }
  },
  methods: {
    ...mapActions([
      'fetchEditableNote',
      'saveNotes'
    ]),
    ...mapMutations({
      deleteNote: 'DELETE_NOTE'
    }),
    toggleAddNoteModal() {
      this.showAddNoteModal = !this.showAddNoteModal;
    },
    editNote(id) {
      this.fetchEditableNote(id);
      this.$router.push({name: 'note-id', params: {id}})
    },
    async removeNote(id) {
      const result = await this.$swal({
        title: 'Вы уверены?',
        showCancelButton: true,
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет'
      })
      if(!result.isConfirmed) {
        return;
      }

      this.deleteNote(id);
      this.saveNotes()
      await this.$swal({
        icon: 'success',
        title: 'Заметка удалена!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  computed: {
    ...mapGetters({
      notes: 'getNotes'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';

.notes {
  display: flex;
  flex-wrap: wrap;
  &__item {
    padding: 1.2rem;
    flex: 0 0 32%;
    margin: 0 0.60%;
    margin-bottom: 1rem;
  }
  .add-note {
    height: 480px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      cursor: pointer;
      width: 200px;
      height: 200px;
      fill: $dark-light;
    }
  }
}

.no-notes {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__title, &__subtitle {
    font-weight: 300;
    font-size: 36px;
    color: $grey-dark;
  }
}
</style>