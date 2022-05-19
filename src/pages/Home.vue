<template>
  <v-container>
    <div>
      <h4 class="display-1">Join Ride</h4>

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
            <td>{{ item.fee }}</td>
            <td>{{ item.make }}</td>
            <td>{{ item.model }}</td>
            <td>{{ item.color }}</td>
            <td>{{ item.fromAddress }}</td>
            <td>{{ item.toAddress }}</td>
            <td>{{ item.capacity }}</td>
            <td>{{ item.numDrivers }}</td>
            <td>
              <v-icon @click="becomeDriver">
                mdi-account-plus
              </v-icon>
            </td>
            <td>
              <v-icon class="ml-2" @click="becomePassenger(item)">
                mdi-account-multiple-plus
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
        { text: "Fee", value: "fee" },
        { text: "Make", value: "make" },
        { text: "Model", value: "model" },
        { text: "Color", value: "color" },
        { text: "From Address", value: "fromAddress" },
        { text: "To Address", value: "toAddress" },
        { text: "Vehicle Capacity", value: "capacity" },
        { text: "Number of Driver", value: "numDrivers"},
        { text: "Driver"},
        { text: "Rider"}
      ],

      rides: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get("/joinRides").then(response => {
      this.rides = response.data.map(rides => ({
        id: rides.id,
        date: rides.date,
        time: rides.time,
        distance: rides.distance,
        fee: rides.fee,
        make: rides.vehicle.make,
        model: rides.vehicle.model,
        color: rides.vehicle.color,
        fromAddress: rides.locations.address,
        toAddress: rides.tolocations.address,
        capacity: rides.vehicle.capacity - 1 - Object.keys(rides.user).length,
        numDrivers: Object.keys(rides.driver).length
      }));
    });
  },

  methods: {

    becomeDriver() {
      this.$router.push({ name: "become-driver" });
    },

    becomePassenger(item) {
      this.$axios.post(`/becomePassenger/${item.id}`, {
        userId: this.$store.state.currentAccount.id,
      })
    },

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

    updateRides(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
    },

  }
};
</script>

<style>
.currentRiders {
  background: lightcoral;
}
</style>
