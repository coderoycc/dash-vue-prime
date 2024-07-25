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
  <FormSystem :is-editing="isEditing" :user="localSystem" @formSubmit="handleSubmit">
    <template #errors v-if="requestError">
      <Message severity="error" @close="resetErrors" icon="pi pi-times-circle">{{
        requestMessage
      }}</Message>
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
        :label="isSubmitting ? 'Actualizando...' : 'Actualizar'"
        :icon="isSubmitting ? 'pi pi-spin pi-spinner' : 'pi pi-check'"
        class="p-button-text"
      />
      <Button
        type="submit"
        v-if="!isEditing"
        :label="isSubmitting ? 'Guardando...' : 'Guardar'"
        :icon="isSubmitting ? 'pi pi-spin pi-spinner' : 'pi pi-check'"
        class="p-button-text"
      />
    </template>
  </FormSystem>
  </Dialog>
</template>
<script setup>
import {ref} from 'vue';
import FormSystem from './FormSystem.vue';
const emit = defineEmits(["update:visible"]);
const emitVisible = (value) => emit("update:visible", value);
const requestError = ref(false);
const requestMessage = ref("");
const isSubmitting = ref(false);
const emptySystem = {
  name: "",
  email: "",
  username: "",
  cellphone: "",
  website: "",
  lastname: "",
};
const localSystem = ref(emptySystem);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  system: {
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
const closeDialog = () => {
  localSystem.value = { ...emptySystem };
  resetErrors();
  emitVisible(false);
};
const onDialogHide = () => {
  localSystem.value = { ...emptySystem };
};
const handleSubmit = () => {

}
</script>