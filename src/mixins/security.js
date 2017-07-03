import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            permission: {
                create: false,
                read: false,
                update: false,
                delete: false,
            },
            security: {
                create: false,
                read: false,
                update: false,
                delete: false,
            },
            allowOwner: false,
        }
    },

    computed: Object.assign({}, (0, mapGetters)({
        effectivePermissions: 'universal/effectivePermissions',
        session: 'universal/user',
    }), {
        owner() {
            return this.user && this.user.code === this.session.code
        },
    }),

    methods: {
        setSecurity() {
            Object.keys(this.permission).forEach((key) => {
                if (!this.permission[key]) {
                    return
                }

                if ((this.allowOwner && this.owner) ||
                    Object.values(this.effectivePermissions).indexOf(this.permission[key]) !== -1 ||
                    Object.values(this.effectivePermissions).indexOf(this.permission[key].replace(/\.\w+$/, '.*')) !== -1 ||
                    Object.values(this.effectivePermissions).indexOf(this.permission[key].replace(/(\.\w+){2}$/, '.*.*')) !== -1) {
                    this.security[key] = true
                } else {
                    this.security[key] = false
                }
            })
        },
    },

    created() {
        this.setSecurity()
    },

    watch: {
        effectivePermissions() {
            this.setSecurity()
        },
    },
}
