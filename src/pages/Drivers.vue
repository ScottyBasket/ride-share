<template>
  <v-container>
    <div>
      <h4 class="display-1">Drivers</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="drivers"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.first_name }}</td>
            <td>{{ item.last_name }}</td>
            <td>{{ item.licenseNumber }}</td>
            <td>{{ item.licenseState }}</td>
            <td>
              <v-icon small @click="deleteDrivers(item)">
                mdi-delete
              </v-icon>
              <v-icon small class="ml-2" @click="updateDrivers(item)">
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
  name: "Drivers",

  data: function() {
    return {
      headers: [
        { text: "First Name", value: "first_name" },
        { text: "Last Name", value: "last_name" },
        { text: "Licence Number", value: "licenseNumber" },
        { text: "Licence State", value: "licenseState" }
      ],

      drivers: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get("/drivers").then(response => {
      this.drivers = response.data.map(drivers => ({
        id: drivers.id,
        first_name: drivers.users.first_name,
        last_name: drivers.users.last_name,
        licenseNumber: drivers.licenseNumber,
        licenseState: drivers.licenseState
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
      const currentDrivers = this.$store.state.currentDrivers;
      if (currentDrivers && currentDrivers.id === item.id) {
        return "currentDrivers";
      }
    },

    // Update location information.
    updateDrivers(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
    },

    // Delete a location.
    deleteDrivers(item) {
      this.$axios.delete(`/drivers/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local location
          // by filtering the deleted location from the list of locations.
          this.drivers = this.drivers.filter(
            drivers => drivers.id !== item.id
          );
        }
      });
    }
  }
};
</script>

<style>
.currentDrivers {
  background: lightcoral;
}
</style>
