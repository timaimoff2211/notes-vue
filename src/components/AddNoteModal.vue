<template>
  <div class="modal" :class="{'active': isActive}">
    <div class="modal__overlay"></div>
    <div class="modal__content">
      <div class="modal__content-header">
        <h4 class="modal__content-header__title">Добавить новую заметку</h4>
      </div>
      <div class="modal__content-body">
        <div class="note-form">
          <label class="note-form__item">
            <span class="note-form__item-label">Заголовок заметки</span>
            <input class="note-form__item-field form-field" v-model="noteTitle">
          </label>

          <h4 class="note-form-subtitle">Список задач</h4>
          <div class="note-form__todos">
            <div 
              class="note-form__todos-item"
              v-for="todo, i in todoItems"
              :key="i"
            >
              <span class="note-form__todos-item__num">{{i+1}}.</span>
              <div class="note-form__todos-item__field">
                <input v-model="todo.title" class="form-field" v-if="!todo.saved">
                <p v-else>{{todo.title}}</p>
              </div>
              <div class="note-form__todos-item__action">
                <button 
                  class="btn default" 
                  @click="toggleTodoSaved(i)"
                >
                  {{ todo.saved ? 'Изменить' : 'Сохранить' }}
                </button>
                <button
                  class="btn danger"
                  @click="removeTodo(i)"
                >
                  Удалить
                </button>
              </div>
            </div>
            <div class="note-form__todos-add">
              <button class="btn default" @click="addTodo">Добавить задачу</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__content-footer">
        <div class="actions">
          <button class="btn default" @click="save">Добавить</button>
          <button class="btn cancel" @click="closeModal">Отменить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean
  },
  data() {
    return {
      noteTitle: '',
      todoItems: []
    }
  },
  methods: {
    addTodo() {
      this.todoItems.push({
        title: '',
        completed: false,
        saved: false
      })
    },
    closeModal() {
      this.noteTitle = '';
      this.todoItems = []
      this.$emit('onClose')
    },
    save() {
      if(!this.noteTitle) {
        this.$toast.error('Введите заголовок заметки!')
        return;
      }
      const note = {
        id: Date.now(),
        title: this.noteTitle,
        date: new Date().toLocaleString(),
        todoList: []
      }
      note.todoList = this.todoItems.filter(todo => todo.saved)
      note.todoList = note.todoList.map(todo => {
        delete todo.saved;
        return todo;
      })
      this.$store.commit('ADD_NOTE', note);
      this.$store.dispatch('saveNotes');
      this.closeModal()
    },
    toggleTodoSaved(index) {
      if(!this.todoItems[index].saved && !this.todoItems[index].title) {
        this.$toast.error('Введите заголовок задачи!')
        return;
      }
      this.todoItems[index].saved = !this.todoItems[index].saved;
    },
    removeTodo(index) {
      this.todoItems = this.todoItems.filter((_, i) => i !== index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
@import '@/assets/scss/buttons.scss';
@import '@/assets/scss/modal.scss';

.modal {
  &__content {
    &-header {
      height: 15%;
      border-bottom: 1px solid $grey-light;
      padding: 1rem;
      display: flex;
      align-items: center;
      &__title {
        font-size: 32px;
        font-weight: 300;
      }
    }
    &-body {
      height: 70%;
      overflow-y: auto;
      padding: 1rem;
      .note-form {
        &-subtitle {
          font-weight: 300;
          font-size: 24px;
          margin: 1.5rem 0;
        }
        &__item {
          &-label {
            display: block;
            margin-bottom: .3rem;
            font-weight: 300;
          }
          &-field {
            width: 100%;
          }
        }

        &__todos {
          &-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            &__num {
              display: block;
              margin-right: .5rem;
            }
            &__field {
              flex: 1;
              input {
                width: 100%;
              }
            }
            &__action {
              margin-left: .5rem;
              button:first-child {
                margin-right: .5rem;
              }
            }
          }

          &-add {
            margin-top: 1rem;
          }
        }
      }
    }
    &-footer {
      border-top: 1px solid $grey-light;
      height: 15%;

      .actions {
        height: 100%;
        display: flex;
        padding: 1rem;
        align-items: center;
        justify-content: flex-end;
        .btn {
          margin-right: .5rem;
        }
      }
    }
  }
}
</style>