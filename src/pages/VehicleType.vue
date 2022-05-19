<template>
  <v-container>
    <div>
      <h4 class="display-1">Vehicle Types</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="types"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.type }}</td>
            <td>
              <v-icon small @click="deleteType(item)">
                mdi-delete
              </v-icon>
              <v-icon small class="ml-2" @click="updateType(item)">
                mdi-pencil
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>

      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
        <v-btn color="blue" text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Types",

  data: function() {
    return {
      headers: [
        { text: "Type", value: "type" },
      ],
      types: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get("/types").then(response => {
      this.types = response.data.map(types => ({
        id: types.id,
        type: types.type
      }));
    });
  },

  methods: {
    // Display a snackbar message.
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.show = true;
    },

    // Calculate the CSS class for an item
    itemClass(item) {
      const currentType = this.$store.state.currentType;
      if (currentType && currentType.id === item.id) {
        return "currentType";
      }
    },

    // Update vehicle type information.
    updateType(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
    },

    // Delete a vehicle type.
    deleteType(item) {
      this.$axios.delete(`/types/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local vehicle type
          // by filtering the deleted vehicle type from the list of vehicle types.
          this.types = this.types.filter(
            types => types.id !== item.id
          );
        }
      });
    }
  }
};
</script>

<style>
.currentType {
  background: lightcoral;
}
</style>
