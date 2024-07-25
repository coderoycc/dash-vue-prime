<template>
  <form @submit.prevent="sendForm">
    <slot name="errors"></slot>
    <div class="formgrid grid">
      <div class="field col">
        <label for="name">Nombre del sistema</label>
        <InputText
          name="name"
          v-model="userForm.name"
          :class="{ 'p-invalid': v$.name.$invalid && v$.name.$dirty }"
        />
        <small v-if="v$.name.$error" class="p-error">
          {{ v$.name.$errors[0].$message }}
        </small>
      </div>
      <div class="field col">
        <label for="name">Fecha de creación</label>
        <Calendar :showIcon="true" :showButtonBar="true" v-model="systemForm.created" ></Calendar>
        <small v-if="v$.created.$error" class="p-error">
          {{ v$.created.$errors[0].$message }}
        </small>
      </div>
      <div class="field col">
        <label for="name">Versión Inicial</label>
        <InputText
          name="version"
          v-model="systemForm.version"
          :class="{ 'p-invalid': v$.version.$invalid && v$.version.$dirty }"
        />
        <small v-if="v$.version.$error" class="p-error">
          {{ v$.version.$errors[0].$message }}
        </small>
      </div>
      <div class="field col">
        <label for="name">Descripción</label>
        <InputText
          name="description"
          v-model="systemForm.description"
          :class="{ 'p-invalid': v$.description.$invalid && v$.description.$dirty }"
        />
        <small v-if="v$.description.$error" class="p-error">
          {{ v$.description.$errors[0].$message }}
        </small>
      </div>
    </div>
    <div class="w-full flex justify-content-end">
      <div class="inline-flex">
        <slot name="buttons"></slot>
      </div>
    </div>
  </form>
</template>
<script setup>
import { ref } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength, helpers } from "@vuelidate/validators";
const defaultForm = {
  name: "",
  lastname: "",
  username: "",
  email: "",
  gender: "",
  cellphone: "",
};
const props = defineProps({
  system: {
    type: Object,
    required: false,
    default: {},
  },
  isEditing: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const systemForm = ref(props.isEditing ? { ...props.system } : { ...defaultForm });
const sendForm = () => {

}
</script>