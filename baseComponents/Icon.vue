<template>
    <div class="icon icon-shape"
         :class="[
            size && `icon-${size}`,
            type && `icon-shape-${type}`,
            gradient && `bg-gradient-${gradient}`,
            shadow && 'shadow',
            rounded && 'rounded-circle',
            color && `text-${color}`
         ]">
        <slot>
          <router-link v-if="to" :to="'/search?type=tags'" :class="['text-'+type]"><i :class="[name, 'align-middle']"></i></router-link>
          <i v-else :class="name"></i>
        </slot>
    </div>
</template>
<script>
export default {
  name: "icon",
  props: {
    name: {
      type: String,
      default: "",
      description: "Icon name"
    },
    size: {
      type: String,
      default: "",
      description: "Icon size"
    },
    type: {
      type: String,
      default: "",
      description: "Icon type (primary, warning etc)"
    },
    gradient: {
      type: String,
      default: "",
      description: "Icon gradient type (primary, warning etc)"
    },
    color: {
      type: String,
      default: "",
      description: "Icon color (primary, warning etc)"
    },
    shadow: {
      type: Boolean,
      default: false,
      description: "Whether icon has shadow"
    },
    rounded: {
      type: Boolean,
      default: false,
      description: "Whether icon is rounded"
    },
    to: {
      type: String,
      default: "",
      description: "Route path"
    }
  }
};
</script>
