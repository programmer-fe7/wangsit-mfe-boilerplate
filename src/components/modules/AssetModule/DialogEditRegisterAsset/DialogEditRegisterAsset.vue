<script setup lang="ts">
import {
  DialogForm,
  Dropdown,
  eventBus,
  ImageCompressor,
  InputText,
  useToast,
} from '@fewangsit/wangsvue';

import { RegEditAssetBody } from '@/components/dto/assetService.dto';

import { DialogFormPayload } from '@fewangsit/wangsvue/components/dialogform/DialogForm.vue';
import { computed, shallowRef } from 'vue';
import { Asset, AssetOption } from '@/types/asset.type';

import AssetServices from '@/components/services/asset.service';

const props = defineProps<{
  selectedAsset: Asset | undefined;
}>();

const isVisible = defineModel<boolean>('visible', { default: false });

const toast = useToast();

const dialogform = shallowRef<InstanceType<typeof DialogForm>>();
const groupValue = shallowRef<string>();
const nameValue = shallowRef<string>();
const brandValue = shallowRef<string>();
const dropdownOptions = shallowRef<AssetOption>({
  nameOptions: [],
  groupOptions: [],
  brandOptions: [],
  modelOptions: [],
  categoryOptions: [],
});

const mode = computed<string>(() => {
  return props.selectedAsset ? 'Edit' : 'Register';
});

const getDropdownOptions = async (): Promise<void> => {
  const assetOptions = await AssetServices.getAssetOptions({
    nameOptions: true,
    groupOptions: true,
    brandOptions: true,
    modelOptions: true,
    categoryOptions: true,
  });

  dropdownOptions.value = {
    ...assetOptions.data.data,
  };
};

const submitForm = async (payload: DialogFormPayload): Promise<void> => {
  const { stayAfterSubmit, formValues } = payload;

  try {
    if (mode.value === 'Register') {
      await AssetServices.postRegisterAsset(
        formValues as unknown as RegEditAssetBody,
      );
    } else {
      await AssetServices.putEditAsset(
        { _id: props.selectedAsset?._id as string },
        formValues as unknown as RegEditAssetBody,
      );
    }

    nameValue.value = undefined;
    brandValue.value = undefined;
    dialogform.value?.clearField();
    if (stayAfterSubmit) {
      groupValue.value = formValues.group as string;
    }

    eventBus.emit('data-table:update', { tableName: 'asset-list' });
    toast.add({
      message: 'Success, asset has been ' + mode.value.toLowerCase() + 'ed.',
      severity: 'success',
    });
  } catch (error) {
    console.error(error);
    toast.add({
      message: 'Failed to ' + mode.value.toLowerCase() + ' asset.',
      severity: 'error',
    });
  }
};

const closeForm = (): void => {
  nameValue.value = undefined;
  brandValue.value = undefined;
};

const showForm = (): void => {
  getDropdownOptions();
};
</script>

<template>
  <DialogForm
    ref="dialogform"
    v-model:visible="isVisible"
    :aside-right-width="600"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    :header="mode + ' Asset'"
    :reset-after-submit="false"
    :show-stay-checkbox="mode === 'Register'"
    @close="closeForm"
    @show="showForm"
    @submit="submitForm"
    severity="success"
    width="medium"
  >
    <template #fields>
      <div class="grid grid-rows-3 gap-4">
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="groupValue"
            :initial-value="groupValue || props.selectedAsset?.group"
            :options="dropdownOptions.groupOptions"
            field-name="group"
            label="Group"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
          <Dropdown
            :initial-value="props.selectedAsset?.category"
            :options="dropdownOptions.categoryOptions"
            field-name="category"
            label="Category"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="nameValue"
            :initial-value="props.selectedAsset?.name"
            :options="dropdownOptions.nameOptions"
            field-name="name"
            label="Name"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
          <InputText
            :value="props.selectedAsset?.aliasName"
            field-info="You can input an alias name for convenience in searching for assets and to differentiate them from others.`"
            field-name="aliasName"
            label="Alias Name"
            use-validator
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="brandValue"
            :disabled="!nameValue"
            :initial-value="props.selectedAsset?.brand"
            :options="dropdownOptions.brandOptions"
            field-name="brand"
            label="Brand"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
          <Dropdown
            :disabled="!brandValue"
            :initial-value="props.selectedAsset?.model"
            :options="dropdownOptions.modelOptions"
            field-name="model"
            label="Model/Type"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
        </div>
      </div>
      <ImageCompressor
        :custom-requirements="['Max. 1 MB', 'Must be image format']"
        :image-preview-url="selectedAsset?.assetImage"
        confirm-on-delete
        field-name="assetImage"
        label="Foto"
        mandatory
        use-validator
        validator-message="File size is too big! Max. 1 MB"
      />
    </template>
  </DialogForm>
</template>
