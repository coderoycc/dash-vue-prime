<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:end>
            <div class="my-2">
              <Button
                label="Nuevo"
                icon="pi pi-plus"
                class="mr-2"
                severity="success"
                @click="newUser"
              />
            </div>
          </template>
        </Toolbar>
        <DataTable
          :value="users"
          :paginator="true"
          :rows="5"
          dataKey="id"
          :rowHover="true"
          filterDisplay="menu"
          showGridlines
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined />
              <IconField iconPosition="left">
                <InputIcon class="pi pi-search" />
                <InputText placeholder="Keyword Search" style="width: 100%" />
              </IconField>
            </div>
          </template>
          <template #empty>
            <div class="text-center">No customers found.</div>
          </template>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Nombre"></Column>
          <Column field="username" header="Usuario"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Teléfono"></Column>
          <Column header="Acciones">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="editUser(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger"
                @click="deleteUser(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
  <UserDialog
    v-model:visible="dialogVisible"
    :user="selectedUser"
    :isEditing="isEditing"
  />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { UserService } from "@/service/UserService.js";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import UserDialog from "@/components/users/DialogUser.vue";
const users = ref([]);
const selectedUser = ref(null);
const isEditing = ref(false);
const dialogVisible = ref(false);
const userService = new UserService();
const toast = useToast();
const confirm = useConfirm();
onMounted(async () => {
  console.log("MOUNTED");
  const response = await userService.getUsers();
  console.log(response.data);
  users.value = response.data;
});

const editUser = (user) => {
  // Lógica para editar usuario
  console.log("Editar usuario:", user);
  selectedUser.value = { ...user };
  isEditing.value = true;
  dialogVisible.value = true;
};

const newUser = () => {
  console.log("Crear nuevo usuario");
  isEditing.value = false;
  dialogVisible.value = true;
};

const deleteUser = async (user) => {
  console.log("Eliminar usuario:", user);
  confirm.require({
    message: `¿Estás seguro de que quieres eliminar a ${user.name}?`,
    acceptIcon: "pi pi-trash",
    acceptClass: "p-button-danger",
    escapeValue: false,
    header: "Confirmar eliminación",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "SÍ",
    rejectLabel: "NO",
    accept: async () => {
      console.log("Eliminar");
      const res = await userService.deleteUser(user.id);
      console.log(res);
      if (res.success) {
        toast.add({
          severity: "success",
          summary: "Correcto",
          detail: `Usuario ${user.name} eliminado`,
          life: 3000,
          closable: true,
          position: "top-right",
        });
      }
    },
    reject: () => {
      console.log("No eliminar");
    },
  });
};
const saveUser = async (user) => {
  console.log("enviado para guardar ", user);
};
const updateUser = async (user) => {
  console.log("Enviado para actualizar", user);
};
</script>
