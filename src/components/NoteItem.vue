<template>
  <div class="note notes__item">
    <div class="note__delete-icon" @click="removeNote">
      <span>&times;</span>
    </div>
    <h3 class="note__title">{{note.title}}</h3>
    <ul class="note__todos" v-if="note.todoList.length">
      <li
        class="note__todos-item"
        v-for="todo, todoIdx in note.todoList"
        :key="note.id+noteIdx+todoIdx"
      >
        <span class="note__todos-item__title">{{todo.title}}</span>
        <div class="note__todos-item__completed">
          <span>{{ todo.completed ? 'Выполнено' : 'Не выполнено' }}</span>
        </div>
      </li>
    </ul>
    <div v-else>
      <h3>Задач пока нет...</h3>
    </div>

    <div class="note__bottom">
      <button class="note__bottom-btn btn default" @click="$emit('onEdit', note.id)">Редактировать</button>
      <p class="note__bottom-date">{{note.date}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    note: {type: Object, required: true},
    noteIdx: {type: Number, required: true}
  },
  methods: {
    removeNote() {
      this.$emit('onDelete', this.note.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors.scss';
@import '@/assets/scss/buttons.scss';
.note {
  position: relative;
  border-radius: 1rem;
  border: 1px solid $grey-light;
  color: $grey-dark;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: $white;

  &__delete-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 28px;
    height: 28px;
    border: 1px solid $grey-light;
    border-radius: 50%;
    font-weight: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
    transition: all .2s ease;
    &:hover {
      background: $grey-light;
      color: $white-dark;
    }
  }

  &__title {
    font-weight: 400;
    font-size: 1.8rem;
    flex: 0 0 10%;
  }

  &__todos {
    flex: 1;
    border-bottom: 1px solid $dark-light;
    margin-bottom: 10px;
    padding-bottom: 10px;
    overflow-y: auto;

    &-item {
      padding: 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 0.5rem;
      box-shadow: 0 3px 3px 0 rgb(0, 0, 0, 10%);
      margin-bottom: .3rem;
      &__title {
        flex: 1;
        font-weight: 400;
        color: $grey-dark;
      }
      &__completed {
        font-size: 12px;
        color: $grey-light;
        font-weight: 300;
      }
    }
  }

  &__bottom {
    flex: 0 0 12%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-btn {
      height: 35px;
    }
    &-date {
      color: $dark-light;
    }
  }
}
</style>