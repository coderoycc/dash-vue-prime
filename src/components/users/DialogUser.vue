<template>
  <Dialog
    :visible="visible"
    @update:visible="emitVisible"
    :style="{ width: '450px' }"
    :header="isEditing ? 'Editar Sistema' : 'Crear nuevo sistema'"
    :modal="true"
    class="p-fluid"
    @hide="onDialogHide"
  >
    <FormUser :is-editing="isEditing" :user="localUser" @formSubmit="handleSubmit">
      <template #errors v-if="requestError">
        <Message severity="error" @close="resetErrors" icon="pi pi-times-circle">{{ requestMessage }}</Message>
      </template>
      <template #buttons>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-text p-inline"
          @click="closeDialog"
        />

        <Button
          v-if="isEditing"
          type="submit"
          label="Actualizar"
          icon="pi pi-check"
          class="p-button-text"
        />
        <Button
          type="submit"
          v-if="!isEditing"
          label="Guardar"
          icon="pi pi-check"
          class="p-button-text"
        />
      </template>
    </FormUser>
  </Dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import FormUser from "./FormUser.vue";
const emptyUser = {
  name: "",
  email: "",
  username: "",
  cellphone: "",
  website: "",
  lastname: "",
};
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  user: {
    type: Object,
    default: {},
    required: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const emit = defineEmits(["update:visible"]);

const localUser = ref(emptyUser);
const requestError = ref(false);
const requestMessage = ref('');
const emitVisible = (value) => emit("update:visible", value);
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      localUser.value = { ...newUser };
    } else {
      localUser.value = { ...emptyUser };
    }
  },
  { immediate: true }
);

const closeDialog = () => {
  localUser.value = { ...emptyUser };
  resetErrors();
  emitVisible(false);
  console.log(requestError.value)
};
const handleSubmit = async (event) => {
  resetErrors();
  setTimeout(() => {
    console.log('sdafds')
    console.log('LLEGO FORM')
    console.log(props.isEditing)
    console.log('DATOS', event)
    requestError.value = true;
    requestMessage.value = 'Error test'
    console.log(requestMessage.value)
    console.log(requestError.value)
  }, 1000);
}
const saveUser = async () => {

};
const updateUser = async () => {
};
const onDialogHide = () => {
  localUser.value = { ...emptyUser };
  resetErrors();
  console.log(localUser.value);
};
const resetErrors = () => {
  requestError.value = false;
  requestMessage.value = '';
}
</script>
