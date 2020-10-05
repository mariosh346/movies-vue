<template>
  <div class="InfiniteScroll">
    <template v-for="(item, index) in items">
      <slot
        :item="item"
        :index="index"
        name="separator"
      />
      <div
        :key="item.id"
        v-observe-visibility="{
          callback: (isVisible) => visibilityChangedOnItem(isVisible, index),
          intersection: { threshold },
          throttle
        }"
        :class="itemClass"
      >
        <slot
          :item="item"
          :index="index"
        />
      </div>
    </template>
    <div
      v-if="!loading && isUpwards && !firstItemIsVisible && !extraItemIsVisible"
    >
      <button
        @click="onDownButtonClicked"
      >
        {{ buttonText }}
      </button>
    </div>
    <div
      v-if="isUpwards"
      v-observe-visibility="{
        callback: visibilityChangedOnExtraItem,
        intersection: { threshold },
        throttle
      }"
    >
      <slot
        :extraItemIsVisible="extraItemIsVisible"
        name="extraItem"
      />
    </div>
  </div>
</template>

<script>
import { ObserveVisibility } from 'vue-observe-visibility';

export default {
  name: 'InfiniteScroll',
  directives: {
    ObserveVisibility
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    isUpwards: {
      default: false,
      type: Boolean
    },
    threshold: {
      default: 0.3,
      type: Number
    },
    throttle: {
      default: 20,
      type: Number
    },
    itemClass: {
      default: '',
      type: String
    },
    buttonText: {
      default: undefined,
      type: String
    },
    throwEvents: {
      default: false,
      type: Boolean
    },
    parentScrollableContainer: {
      default: () => undefined,
      type: HTMLDivElement
    }
  },
  data() {
    return {
      firstItemIsVisible: true,
      extraItemIsVisible: true
    };
  },
  computed: {
    scrollableContainer() {
      return this.parentScrollableContainer || this.$el;
    },
    indexOfLastItem() {
      return (this.isUpwards) ? 0 : (this.items.length - 1);
    },
    indexOfFirstItem() {
      return (!this.isUpwards) ? 0 : (this.items.length - 1);
    }
  },
  watch: {
    items() {
      if (this.isUpwards) {
        // keep the position of the scrollbar at the last watched items
        const initialHeight = this.scrollableContainer.scrollHeight;
        this.$nextTick(() => {
          // do not change scrolling if there is not extra items
          if (this.scrollableContainer.scrollHeight > initialHeight) {
            this.scrollableContainer.scrollTop = this.scrollableContainer.scrollHeight - initialHeight;
          }
        });
      }
    }
  },
  mounted() {
    this.$on('scrollToBottomOfContainer', () => this.scrollToBottomOfContainer());
    if (this.isUpwards) {
      this.scrollToBottomOfContainer();
    }
  },
  methods: {
    /**
         *  Scroll to bottom of messages container on page load in order to achieve reverse scrolling
         */
    async scrollToBottomOfContainer() {
      setTimeout(() => {
        this.scrollableContainer.scrollTop = this.scrollableContainer.scrollHeight;
      }, 1);
    },
    /**
         * Track visibility changes of items.
         * If throwEvents is enabled, emit visibility change to parent, for each item in page.
         *
         * @param isVisible {boolean}
         */
    visibilityChangedOnExtraItem(isVisible) {
      this.extraItemIsVisible = isVisible;
    },
    /**
         * Track visibility changes of items.
         * If throwEvents is enabled, emit visibility change to parent, for each item in page.
         *
         * @param isVisible {boolean}
         * @param index {number}
         */
    visibilityChangedOnItem(isVisible, index) {
      if (isVisible) {
        if (index === this.indexOfFirstItem) {
          this.firstItemIsVisible = true;
          this.$emit('firstItemIsVisible');
        } else if (index === this.indexOfLastItem) {
          this.$emit('lastItemIsVisible')
        }
      } else if (index === this.indexOfFirstItem) {
        this.firstItemIsVisible = false;
      }

      if (this.throwEvents) {
        this.$emit('itemVisibilityChange', { isVisible, index });
      }
    },
    onDownButtonClicked() {
      this.scrollToBottomOfContainer();
    }
  }
};
</script>
