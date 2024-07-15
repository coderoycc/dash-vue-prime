<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <h3 class="m-0 text-color">Sistemas registrados</h3>
            </div>
          </template>
          <template v-slot:end>
            <div class="my-2">
              <Button
                label="Registrar nuevo sistema"
                icon="pi pi-plus"
                class="mr-2"
                severity="success"
              />
            </div>
          </template>
        </Toolbar>
        <DataTable
          :value="systems"
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
                <InputText placeholder="Buscar" style="width: 100%" />
              </IconField>
            </div>
          </template>
          <template #empty>
            <div class="text-center">Listado de sistemas vacio</div>
          </template>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Nombre del sistema"></Column>
          <Column field="created_at" header="Creado en"></Column>
          <Column field="created_by" header="Creado por"></Column>
          <Column header="Acciones">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="editSystem(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger"
                @click="deleteSystem(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const systems = ref([]);
async function editSystem(sys) {}
async function deleteSystem(sys) {}
</script>
