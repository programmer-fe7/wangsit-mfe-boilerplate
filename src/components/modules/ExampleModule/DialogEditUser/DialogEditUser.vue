<script setup lang="ts">
/*
 * FIXME: This file isn't used to edit users, it's used to edit assets, so the file name should be changed.
 * Follow the naming conventions as well (coding style guide chapter 6.1)
 */
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputText,
} from '@fewangsit/wangsvue';
import { ref } from 'vue';

/*
 * FIXME: Types must not be declared inside vue files
 * Reference: Coding style guide chapter 4.7
 * 
 * And this type shouldn't even be declared in the first place,
 * it should've been imported instead
 */
type OptionValue = string | number;

const visible = defineModel<boolean>('visible', { default: false });
/*
 * FIXME: Variables should be named with Pascal Case. The name is also too vague,
 * the name should describe what this variable is used for
 * Reference: Coding style guide chapter 6.1.3
 * 
 * And primitive values should also use shallowRef instead of ref
 * Reference: Coding style guide chapter 6.3.4, 'When to use shallowRef?'
 */
const nonnullablevalue = ref<OptionValue>();
</script>

<template>
  <DialogForm
    v-model:visible="visible"
    :aside-right-width="600"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    header="Edit Asset"
    severity="success"
    width="medium"
  >
    <template #fields>
      <div class="grid grid-rows-3 gap-4">
        <div class="grid grid-cols-2 gap-4">
          <!-- FIXME: All of the dropdowns below should use unique v-models, not the same one -->
          <Dropdown
            v-model="nonnullablevalue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="groups"
            label="Group"
            option-label="label"
            option-value="value"
          />
          <Dropdown
            v-model="nonnullablevalue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="categories"
            label="Category"
            option-label="label"
            option-value="value"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="nonnullablevalue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="name"
            label="Name"
            option-label="label"
            option-value="value"
          />
          <InputText
            :mandatory="false"
            field-name="aliasName"
            label="Alias Name"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="nonnullablevalue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="brands"
            label="Brand"
            option-label="label"
            option-value="value"
          />
          <Dropdown
            v-model="nonnullablevalue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="models"
            label="Model/Type"
            option-label="label"
            option-value="value"
          />
        </div>
      </div>
      <ImageCompressor :mandatory="false" multiple label="Foto/>
    </template>
  </DialogForm>
</template>
