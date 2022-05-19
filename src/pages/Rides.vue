<template>
  <v-container>
    <div>
      <h4 class="display-1">Rides</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="rides"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.date }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.distance }}</td>
            <td>{{ item.fuelPrice }}</td>
            <td>{{ item.fee }}</td>
            <td>{{ item.make }}</td>
            <td>{{ item.model }}</td>
            <td>{{ item.color }}</td>
            <td>{{ item.first_name }}</td>
            <td>{{ item.last_name }}</td>
            <td>
              <v-icon small @click="deleteRides(item)">
                mdi-delete
              </v-icon>
              <v-icon small class="ml-2" @click="updateRides(item)">
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
  name: "Rides",

  data: function() {
    return {
      headers: [
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "Distance", value: "distance" },
        { text: "Fuel Price", value: "fuelPrice" },
        { text: "Fee", value: "fee" },
        { text: "Make", value: "make" },
        { text: "Model", value: "model" },
        { text: "Color", value: "color" },
        { text: "First Name", value: "first_name" },
        { text: "Last Name", value: "last_name" }
      ],
      rides: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get("/rides").then(response => {
      this.rides = response.data.map(rides => ({
        id: rides.id,
        date: rides.date,
        time: rides.time,
        distance: rides.distance,
        fuelPrice: rides.fuelPrice,
        fee: rides.fee,
        make: rides.vehicle.make,
        model: rides.vehicle.model,
        color: rides.vehicle.color,
        first_name: rides.driver[0].users.first_name,
        last_name: rides.driver[0].users.last_name
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
      const currentRiders = this.$store.state.currentRiders;
      if (currentRiders && currentRiders.id === item.id) {
        return "currentRiders";
      }
    },

    // Update location information.
    updateRides(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
    },

    // Delete a location.
    deleteRides(item) {
      this.$axios.delete(`/rides/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local location
          // by filtering the deleted location from the list of locations.
          this.rides = this.rides.filter(
            rides => rides.id !== item.id
          );
        }
      });
    }
  }
};
</script>

<style>
.currentRiders {
  background: lightcoral;
}
</style>
