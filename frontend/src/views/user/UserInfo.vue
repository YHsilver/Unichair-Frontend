<template>
  <div>
    <userDetails />
  </div>
</template>

<script>
import userDetails from '@/components/auth/userDetails.vue';

export default {
  name: 'UserInfo',
  components: { userDetails },
};
</script>
