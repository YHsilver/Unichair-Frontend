<template>
  <div style="width:100%">
    <MessageTable />
  </div>
</template>

<script>
import MessageTable from '@/components/MessageTable.vue';

export default {
  name: 'UserMessageReceived',
  components: { MessageTable },
};
</script>
