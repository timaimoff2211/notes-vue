<template>
  <div class="content">
    <bread-crumb :points="breadCrumbPoints" />
    <div class="note-form">
      <div class="note-form__top">
        <h1 class="note-form__top-title">{{ noteInstance.title }}</h1>
        <div class="note-form__top-delete-note">
          <button class="btn danger" @click="removeNote">Удалить заметку</button>
        </div>
      </div>
      <div class="note-form__created-date">
        <p>Дата создания: {{note.date}}</p>
      </div>

      <div class="note-form__items">
        <label class="note-form__items-item">
          <p>Заголовок заметки</p>
          <input class="note-form__items-item__field form-field" v-model="note.title">
        </label>

        <h3 class="note-form__items-section-title">Список задач</h3>

        <h4 v-if="!note.todoList.length" class="note-form__items-no-todos">Пока нет ни одной задачи...</h4>
        <div
          v-else
          class="note-form__items__todo"
          v-for="todo, todoIdx in note.todoList"
          :key="note.id+todoIdx"
        >
          <div class="note-form__items__todo-field">
            <span>{{ todoIdx+1 }}</span>
            <input class="form-field" v-model="todo.title">
          </div>
          <div class="note-form__items__todo-completed">
            <span>Выполнено: </span>
            <input type="checkbox" v-model="todo.completed">
          </div>
          <div class="note-form__items__todo-delete">
            <button class="btn danger" @click="removeTodo(todoIdx)">&times;</button>
          </div>
        </div>

        <div class="note-form__items-add">
          <button class="btn default" @click="addtodo">Добавить задачу</button>
        </div>

      </div>

      <div class="note-form__actions">
        <div class="note-form__actions-item">
          <button class="btn default" @click="saveNote">Сохранить</button>
        </div>
        <div class="note-form__actions-item">
          <button class="btn cancel" @click="cancel">Отменить</button>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import BreadCrumb from '@/components/BreadCrumb'

export default {
  components: { BreadCrumb },
  data() {
    return {
      note: null,
      breadCrumbPoints: [
        {label: 'Главная', urlName: 'main', isLink: true},
        {label: 'Редактирование заметки',urlName: null, isLink: false}
      ]
    }
  },
  methods: {
    ...mapActions([
      'fetchEditableNote',
      'saveNotes'
    ]),
    ...mapMutations({
      dropNote: 'DROP_EDITABLE_NOTE',
      updateNote: 'UPDATE_NOTE',
      deleteNote: 'DELETE_NOTE'
    }),
    async removeNote() {
      const result = await this.$swal({
        title: 'Вы уверены?',
        showCancelButton: true,
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет'
      })
      if(!result.isConfirmed) {
        return;
      }

      this.deleteNote(this.note.id);
      this.saveNotes()
      await this.$swal({
        icon: 'success',
        title: 'Заметка удалена!',
        showConfirmButton: false,
        timer: 1500
      })
      this.exit()
    },
    addtodo() {
      this.note.todoList.push({
        title: '',
        completed: false
      })
    },
    removeTodo(index) {
      this.note.todoList = this.note.todoList.filter((_, i) => i !== index)
    },
    async saveNote() {
      let errors = 0;
      if(!this.note.title) {
        this.$toast.error('Заголовок заметки обязательно поле!')
        errors++;
      }
      this.note.todoList.forEach((todo, todoIdx) => {
        if(!todo.title) {
          this.$toast.error(`Введите текст для задачи под номером: ${todoIdx+1}!`)
          errors++;
        }
      })
      if(errors > 0) {
        return;
      }

      this.updateNote(this.note);
      this.saveNotes();
      await this.$swal({
        icon: 'success',
        title: 'Заметка сохранена!',
        showConfirmButton: false,
        timer: 1500
      })
      this.exit()
    },
    async cancel() {
      const result = await this.$swal({
        title: 'Вы уверены?',
        showCancelButton: true,
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет'
      })
      if(result.isConfirmed) {
        this.exit()
      }
    },
    exit() {
      this.$router.push({name: 'main'})
    }
  },
  created() {
    if(this.note === null) {
      this.fetchEditableNote(+this.$route.params.id);
    }

    this.note = {...this.noteInstance, todoList: []};
    this.noteInstance.todoList.forEach(todo => {
      this.note.todoList.push({...todo});
    })
  },
  beforeDestroy() {
    this.dropNote()
  },
  computed: {
    ...mapGetters({
      noteInstance: 'getEditableNote',
      notes: 'getNotes'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
@import '@/assets/scss/buttons.scss';
.note-form {
  &__top {
    display: flex;
    align-items: center;
    &-title {
      flex: 1;
      font-weight: 300;
      text-transform: uppercase;
      font-size: 36px;
    }
    &-delete-note {
      padding-left: 10px;
    }
  }

  &__created-date {
    color: $grey-dark;
    padding: .5rem 0;
  }

  &__items {
    padding: 2rem 0;
    max-width: 80%;

    &-no-todos {
      font-weight: 300;
      font-size: 20px;
      margin-bottom: 1rem;
    }
    &-item {
      display: block;
      margin-bottom: 1rem;
      p {
        color: $grey-dark;
        font-weight: 300;
        margin-bottom: .3rem;
      };
      &__field {
        width: 100%;
      }
    }

    &__todo {
      padding: .7rem;
      margin-bottom: 1rem;
      border: 1px solid $grey-light;
      border-radius: .3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-field {
        flex: 1;
        margin-right: .5rem;
        display: flex;
        align-items: center;
        span {
          display: block;
          margin-right: .5rem;
        }
        input {
          flex: 1;
        }
      }
      &-delete {
        .btn {
          width: 26px;
          height: 26px;
          line-height: 12px;
          font-size: 18px;
        }
      }

      &-completed {
        margin-right: .5rem;
      }
    }



    &-section-title {
      font-size: 20px;
      font-weight: 500;
      color: $grey-dark;
      margin-bottom: 1rem;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    padding-top: 1rem;
    margin-top: 2rem;
    border-top: 1px solid $grey-light;
    &-item {
      margin-right: .5rem;
    }
  }
}
</style>