const TextInput = {
  props: {
    id: String,
    label: String,
    required: Boolean,
    type: String,
  },
  data() {
    return {}
  },
  methods: {
  },
  template: `
    <label v-if="this.label" class="form-label text-start w-25" for="email">{{ this.label }}</label>
    <div class="w-75 text-start">
      <input :required="this.required" type="this.type" id="this.id" class="form-control border border-secondary w-75" />
    </div>
  `
};

export { TextInput };
