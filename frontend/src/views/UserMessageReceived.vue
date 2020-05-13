<template>
  <div style="width:100%">
    <MessageTable />
  </div>
</template>

<script>
import MessageTable from '@/components/message/MessageTable.vue';

export default {
  name: 'UserMessageReceived',
  components: { MessageTable },
};
</script>
