<template> 
  <v-layout row>
    <v-flex>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-side-icon />

          <v-toolbar-title>Movies</v-toolbar-title>
        
          <v-text-field
            v-model="search"
            xs12
            sm6
            offset-sm3
            class="mx-3"
            flat
            label="Search"
            prepend-inner-icon="search"
            solo-inverted
            clearable 
            @click:clear="clearSearch"
          />
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="item.title"
              avatar
              ripple
              @click="toggle(index)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">
                  {{ item.poster_path }}
                </v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.vote_average }}</v-list-tile-sub-title>
              </v-list-tile-content>

            <!-- <v-list-tile-action>
              <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
              <v-icon
                v-if="selected.indexOf(index) < 0"
                color="grey lighten-1"
              >
                star_border
              </v-icon>

              <v-icon
                v-else
                color="yellow darken-2"
              >
                star
              </v-icon>
            </v-list-tile-action> -->
            </v-list-tile>
            <v-divider
              v-if="index + 1 < items.length"
              :key="index"
            />
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src="./search.js"></script>
<style></style>