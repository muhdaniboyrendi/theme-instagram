<script setup>
const props = defineProps({
  value: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleChange = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="w-full">
    <input
      type="radio"
      :id="props.id"
      name="confirmation"
      :value="props.value"
      :checked="modelValue === props.value"
      @change="handleChange"
      class="hidden peer"
      required
    />
    <label
      :for="props.id"
      class="inline-flex items-center justify-center gap-2 w-full py-2 text-white font-semibold border-2 border-white/50 rounded-lg cursor-pointer peer-checked:bg-white peer-checked:text-dark hover:border-white transition"
    >
      <i v-if="modelValue === props.value" class="bi bi-check2-square"></i
      ><span class="font-medium">{{ props.label }}</span>
    </label>
  </div>
</template>
