<template>
  <form @submit.prevent="sendForm">
    <slot name="errors"></slot>
    <div class="formgrid grid">
      <div class="field col">
        <label for="name">Nombre completo</label>
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
        <label for="lastname"
          >Apellidos
          <span class="text-red-500" v-if="v$.lastname.$required">*</span></label
        >
        <InputText
          name="lastname"
          v-model="userForm.lastname"
          :class="{ 'p-invalid': v$.lastname.$invalid && v$.lastname.$dirty }"
        />
        <small v-if="v$.lastname.$error" class="p-error">
          {{ v$.lastname.$errors[0].$message }}
        </small>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col">
        <label for="username">Usuario</label>
        <InputText
          name="username"
          v-model="userForm.username"
          :class="{ 'p-invalid': v$.username.$invalid && v$.username.$dirty }"
        />
        <small v-if="v$.username.$error" class="p-error">
          {{ v$.username.$errors[0].$message }}
        </small>
      </div>
      <div class="field col">
        <label for="email">Correo electrónico</label>
        <InputText
          name="email"
          v-model="userForm.email"
          :class="{ 'p-invalid': v$.email.$invalid && v$.email.$dirty }"
        />
        <small v-if="v$.email.$error" class="p-error">
          {{ v$.email.$errors[0].$message }}
        </small>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col">
        <label for="gender">Género</label>
        <Dropdown
          v-model="userForm.gender"
          :options="genderOptions"
          optionLabel="name"
          placeholder="Selecciona uno"
        ></Dropdown>
        <small v-if="v$.gender.$error" class="p-error">
          {{ v$.gender.$errors[0].$message }}
        </small>
      </div>
      <div class="field col">
        <label for="cellphone"
          >Celular
          <span
            class="text-red-500"
            v-if="userForm.gender.code == 'F' || userForm.email == ''"
            >*</span
          ></label
        >
        <InputText name="cellphone" v-model="userForm.cellphone" />
        <small v-if="v$.cellphone.$error" class="p-error">
          {{ v$.cellphone.$errors[0].$message }}
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
import { ref, computed, onMounted, defineProps } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength, helpers } from "@vuelidate/validators";
const defaultForm = {
  name: "",
  lastname: "",
  username: "",
  email: "",
  gender: { name: '', code: '' },
  cellphone: "",
};
const genderOptions = [
  { name: "MASCULINO", code: "M" },
  { name: "FEMENINO", code: "F" },
];
onMounted(() => {
  console.log(props.isEditing);
  console.log(props.user, "usuario");
  console.log("Es editar o que");
});
const props = defineProps({
  user: {
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
const emit = defineEmits(["formSubmit"]);
const userForm = ref(props.isEditing ? { ...props.user, gender: { name: '', code: '' } } : { ...defaultForm });
const requiredIf = (condition) =>
  helpers.withMessage("Este campo es requerido", (value) => {
    console.log("Validacion custom", value);
    console.log(
      "valores condition",
      userForm.value.gender.code == "F" || userForm.value.email == ""
    );
    if (condition()) {
      return value != null && value.trim() != "";
    }
    return true;
  });
const rules = computed(() => ({
  name: {
    required: helpers.withMessage("Este campo es requerido", required),
    minLength: helpers.withMessage(
      "El campo nombre debe tener minimo 3 caracteres",
      minLength(3)
    ),
    maxLength: helpers.withMessage(
      "El campo nombre debe tener como máximo 30 caracteres",
      maxLength(30)
    ),
  },
  lastname: {
    required: helpers.withMessage("El campo apellido es requerido", required),
    minLength: helpers.withMessage(
      "El campo debe tener 5 caracteres como mínimo",
      minLength(5)
    ),
    maxLength: helpers.withMessage("El máximo permitido es 20 caracteres", maxLength(20)),
  },
  username: {
    required: helpers.withMessage("El campo username es requerido", required),
    minLength: helpers.withMessage(
      "El usuario debe tener como mínimo 5 caracteres",
      minLength(5)
    ),
  },
  email: {
    email: helpers.withMessage("Ingrese un correo electrónico válido", email),
  },
  gender: {
    required: helpers.withMessage("Este campo es requerido", required),
  },
  cellphone: {
    required: requiredIf(
      () => userForm.value.gender.code == "F" || !userForm.value.email
    ),
  },
}));
const v$ = useVuelidate(rules, userForm);
const sendForm = async () => {
  const result = await v$.value.$validate();
  console.log(result);
  if (result) {
    emit("formSubmit", userForm.value);
  }
};
</script>
