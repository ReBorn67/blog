<template>
  <component :is="layoutComponent">
    <template slot="nav">
      <div class="nav-wrapper">
        <ul class="nav text-center"
            role="tablist"
            :class="
            [type ? `nav-pills-${type}`: '',
              pills ? 'nav-pills': 'nav-tabs',
             {'nav-pills-icons': icons},
             {'nav-fill': fill},
             {'nav-pills-circle': circle},
             {'justify-content-center': centered},
             tabNavClasses
            ]">

          <li v-for="(tab, index) in tabs"
              :class="[
                'pl-0',
                setTabNavItemClass(index, tabs, tabNavItemCount)
              ]"
              :key="tab.id || tab.title">

            <a 
              data-toggle="tab"
              role="tab"
              class="nav-link"
              :href="`#${tab.id || tab.title}`"
              @click.prevent="activateTab(tab)"
              :aria-selected="tab.active"
              :class="[
                tab.active ? 
                  (type ? `active bg-${type}` : 'active') : 
                  (type ? `text-${type}` : '')

              ]"
            >
              <tab-item-content :tab="tab">
              </tab-item-content>
            </a>

          </li>

        </ul>
      </div>
    </template>
    <div slot="content" class="tab-content"
         :class="[tabContentClasses]">
      <slot v-bind="slotData"></slot>
    </div>
  </component>
</template>

<script>
import PillsLayout from "./PillsLayout";
import TabsLayout from "./TabsLayout";
export default {
  name: "tabs",
  components: {
    TabsLayout,
    PillsLayout,
    TabItemContent: {
      props: ["tab"],
      render(h) {
        return h("div", [this.tab.$slots.title || this.tab.title]);
      }
    }
  },
  props: {
    type: {
      type: String,
      default: "",
      validator: value => {
        let acceptedValues = [
          "",
          "primary",
          "info",
          "success",
          "warning",
          "danger",
          "theme1",
          "theme2",
          "theme3",
          "theme4",
          "theme5"
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
      description: "Tabs type (primary|info|danger|default|warning|success)"
    },
    pills: {
      type: Boolean,
      default: true,
      description: "Whether tabs are pills"
    },
    circle: {
      type: Boolean,
      default: false,
      description: "Whether tabs are circle"
    },
    fill: {
      type: Boolean,
      default: true,
      description: "Whether to fill each tab"
    },
    activeTab: {
      type: String,
      default: "",
      description: "Default active tab name"
    },
    tabNavWrapperClasses: {
      type: [String, Object],
      default: "",
      description: "Tab Nav wrapper (div) css classes"
    },
    tabNavClasses: {
      type: [String, Object],
      default: "",
      description: "Tab Nav (ul) css classes"
    },
    tabNavItemCount: {
      type: [Number],
      default: -1,
      description: "Tab Nav Item (li) col size"
    },
    tabContentClasses: {
      type: [String, Object],
      default: "",
      description: "Tab content css classes"
    },
    icons: {
      type: Boolean,
      description: "Whether tabs should be of icon type (small no text)"
    },
    centered: {
      type: Boolean,
      description: "Whether tabs are centered"
    },
    value: {
      type: String,
      description: "Initial value (active tab)"
    }
  },
  provide() {
    return {
      addTab: this.addTab,
      removeTab: this.removeTab
    };
  },
  data() {
    return {
      tabs: [],
      activeTabIndex: 0
    };
  },
  computed: {
    layoutComponent() {
      return this.pills ? "pills-layout" : "tabs-layout";
    },
    slotData() {
      return {
        activeTabIndex: this.activeTabIndex,
        tabs: this.tabs
      };
    }
  },
  methods: {
    findAndActivateTab(title) {
      let tabToActivate = this.tabs.find(t => t.title === title);
      if (tabToActivate) {
        this.activateTab(tabToActivate);
      }
    },
    activateTab(tab) {
      if (this.handleClick) {
        this.handleClick(tab);
      }
      this.deactivateTabs();
      tab.active = true;
      this.activeTabIndex = this.tabs.findIndex(t => t.active);
    },
    deactivateTabs() {
      this.tabs.forEach(tab => {
        tab.active = false;
      });
    },
    addTab(tab) {
      if (this.activeTab === tab.name) {
        tab.active = true;
      }
      this.tabs.push(tab);
    },
    removeTab(tab) {
      const tabs = this.tabs;
      const index = tabs.indexOf(tab);
      if (index > -1) {
        tabs.splice(index, 1);
      }
    },
    setTabNavItemClass (index, tabs, count) {
      if (count === -1) {
        count = tabs.length;
      }

      let classArr = [];

      let col = 12 / count;
      let colLg = Math.ceil(12 / tabs.length);

      let size = (index + 1) % count;

      let totalLines = Math.ceil(tabs.length / count);

      if (index + 1 <= (totalLines - 1) * count) {
        classArr.push('pb-3', 'pb-lg-0');
      }

      if (size == 0) {
        classArr.push('pr-0');

        if (tabs.length - 1 !== index) {
          classArr.push('pr-lg-3');
        }

      } else {
        classArr.push('pr-3');
      }

      classArr.push('col-'+col, 'col-lg-'+colLg);

      return classArr.join(' ');
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.value) {
        this.findAndActivateTab(this.value);
      } else {
        if (this.tabs.length > 0) {
          this.activateTab(this.tabs[0]);
        }
      }
    });
  },
  watch: {
    value(newVal) {
      this.findAndActivateTab(newVal);
    }
  }
};
</script>
