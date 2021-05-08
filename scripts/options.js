// Settings - Save PrivateKey
Vue.component("PrivateKeyEditor", {
    template: `<sui-form class="editor-private-key" @submit="privateKeySaveHandler">
      <sui-divider horizontal>Authorization</sui-divider>
      <sui-form-field>
        <label>Private Key</label>
          <textarea rows="2" type="text" name="privatekey" placeholder="Paste your private key here." v-model="privatekey"></textarea>
      </sui-form-field>
      <sui-button :content="saveStatus ? 'Saved!' : 'Save'" type="submit" primary :positive="saveStatus" />
    </sui-form>`,
    name: "PrivateKeyEditor",
    data() {
        return {
            privatekey: "",
            saveStatus: false,
        };
    },
    methods: {
        privateKeySaveHandler(e) {
            e.preventDefault();
            const form = new FormData(e.target);
            const json = {};
            for (let pair of form.entries()) {
                json[pair[0]] = pair[1];
            }
            window.localStorage.setItem(window.__ext__VARS.LOCAL_STORAGE_KEYNAME, json.privatekey);
            this.saveStatus = true;
            setTimeout(() => {
                this.saveStatus = false;
            }, 1000);
        },
    },
    mounted() {
        // fetch stored private key
        this.privatekey =
            window.localStorage.getItem(window.__ext__VARS.LOCAL_STORAGE_KEYNAME) || "";
    },
});
Vue.component("LegacySettingEditor", {
    template: `<sui-form class="legacy-setting-editor" @submit="legacySettingSaveHandler">
      <sui-divider horizontal>Legacy Settings</sui-divider>
      <sui-form-field>
        <sui-checkbox toggle label="Enable Plugin?" v-model="enable" name="enable" @change="enableToggler" />
      </sui-form-field>
      <sui-form-field inline :disabled="!enable">
        <label>Ajax Parameter: </label>
        <input type="text" placeholder="ajaxID" name="ajax_param" :value="ajax_param" />
      </sui-form-field>
      <sui-button :content="saveStatus ? 'Saved!' : 'Save'" type="submit" primary :positive="saveStatus" />
    </sui-form>`,
    name: "LegacySettingEditor",
    data() {
        return {
            saveStatus: false,
            enable: false,
            ajax_param: ""
        };
    },
    mounted() {
        let data = window.localStorage.getItem(window.__ext__VARS.LOCAL_STORAGE_SETTINGNAME);
        data = JSON.parse(data || "{}");
        this.ajax_param = data.ajax_param || "ajaxID";
        this.enable = data.enable === "on";
    },
    methods: {
        legacySettingSaveHandler(e) {
            e.preventDefault();
            const form = new FormData(e.target);
            const json = {};
            for (let pair of form.entries()) {
                json[pair[0]] = pair[1];
            }
            window.localStorage.setItem(window.__ext__VARS.LOCAL_STORAGE_SETTINGNAME, JSON.stringify(json));
            this.saveStatus = true;
            setTimeout(() => {
                this.saveStatus = false;
            }, 1000);
        },
        enableToggler(bool) {
            this.enable = bool;
        }
    },
});

var App = {
    template: `<div><private-key-editor /><legacy-setting-editor /></div>`,
    name: "App",
    data() {
        return {};
    },
    methods: {},
};
Vue.config.productionTip = false;
Vue.use(SemanticUIVue);

new Vue({
    render: (h) => h(App),
}).$mount("#app");