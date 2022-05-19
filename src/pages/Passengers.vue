<template>
  <v-container>
    <div>
      <h4 class="display-1">Passengers</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="passengers"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.first_name }}</td>
            <td>{{ item.last_name }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.distance }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.toName }}</td>
            <td>{{ item.toAddress }}</td>
            <td>
              <v-icon small @click="deletePassengers(item)">
                mdi-delete
              </v-icon>
              <v-icon small class="ml-2" @click="updatePassengers(item)">
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
  name: "passengers",

  data: function() {
    return {
      headers: [
        { text: "First Name", value: "first_name" },
        { text: "Last Name", value: "last_name" },
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "Distance (Miles)", value: "distance" },
        { text: "From Location", value: "name" },
        { text: "From Address", value: "address" },
        { text: "To Location", value: "toName" },
        { text: "To Address", value: "toAddress" }
      ],

      passengers: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get("/passengers").then(response => {
      this.passengers = response.data.map(passengers => ({
        id: passengers.id,
        first_name: passengers.users.first_name,
        last_name: passengers.users.last_name,
        date: passengers.rides.date,
        time: passengers.rides.time,
        distance: passengers.rides.distance,
        name: passengers.rides.locations.name,
        address: passengers.rides.locations.address,
        toName: passengers.rides.tolocations.name,
        toAddress: passengers.rides.tolocations.address
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
      const currentpassengers = this.$store.state.currentpassengers;
      if (currentpassengers && currentpassengers.id === item.id) {
        return "currentpassengers";
      }
    },

    // Update location information.
    updatepassengers(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
    },

    // Delete a location.
    deletepassengers(item) {
      this.$axios.delete(`/passengers/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local location
          // by filtering the deleted location from the list of locations.
          this.passengers = this.passengers.filter(
            passengers => passengers.id !== item.id
          );
        }
      });
    }
  }
};
</script>

<style>
.currentpassengers {
  background: lightcoral;
}
</style>
