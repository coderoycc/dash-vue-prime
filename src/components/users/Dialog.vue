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
    <!-- <div class="field">
      <label for="name">Nombre</label>
      <InputText id="name" v-model="localUser.name" required autofocus />
    </div>
    <div class="field">
      <label for="email">Email</label>
      <InputText id="email" v-model="localUser.email" required />
    </div>
    <div class="field">
      <label for="age">Edad</label>
      <InputNumber id="age" v-model="localUser.age" />
    </div> -->
    <FormUser :is-editing="isEditing" :user="localUser" />
    <template #footer>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeDialog"
      />

      <Button
        v-if="isEditing"
        label="Actualizar"
        icon="pi pi-check"
        class="p-button-text"
        @click="updateUser"
      />

      <Button
        v-if="!isEditing"
        label="Guardar"
        icon="pi pi-check"
        class="p-button-text"
        @click="saveUser"
      />
    </template>
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
const emit = defineEmits(["update:visible", "save"]);

const localUser = ref(emptyUser);
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
  emitVisible(false);
};

const saveUser = () => {
  emit("save", localUser.value);
  closeDialog();
};
const updateUser = () => {
  emit("update", localUser.value);
  closeDialog();
};
const onDialogHide = () => {
  localUser.value = { ...emptyUser };
  console.log(localUser.value);
};
</script>
