<template>
  <Dialog
    :visible="visible"
    :style="{ width: '450px' }"
    :header="isEditing ? 'Editar Sistema' : 'Crear nuevo sistema'"
    :modal="true"
    class="p-fluid"
    @update:visible="$emit('update:visible', $event)"
  >
    <div class="field">
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
    </div>
    <template #footer>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeDialog"
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        class="p-button-text"
        @click="saveUser"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

const props = defineProps({
  visible: Boolean,
  user: Object,
  isEditing: Boolean,
});

const emit = defineEmits(["update:visible", "save"]);

const localUser = ref({ name: "", email: "", age: null });

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      localUser.value = { ...newUser };
    } else {
      localUser.value = { name: "", email: "", age: null };
    }
  },
  { immediate: true }
);

const closeDialog = () => {
  emit("update:visible", false);
};

const saveUser = () => {
  emit("save", localUser.value);
  closeDialog();
};
</script>
