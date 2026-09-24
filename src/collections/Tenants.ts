import { CollectionConfig } from "payload";


export const Tenants : CollectionConfig = {

    slug:'tenants',
    admin:{
        useAsTitle:'slug',
    },
    fields:[
        {
            name:"name",
            type:"text",
            required:true,
            label:"Store Name",
            admin:{
                description:"This is the name of the store e.g vishal's Store",
            },
        },
        {
            name:"slug",
            type:"text",
            required:true,
            index:true,
            unique:true,
            admin:{
                description: "This is subdomain for the store (e.g. [slug].funroad.com)",
            },
        },
        {
            name:"image",
            type:"upload",
            relationTo:"media",
        },
        {
            name:"stripeAccountId",
            type:"text",
            required:true,
            admin:{
                readOnly:true,
            },
        },
        {
            name:"stripeDetailsSubmitted",
            type:"checkbox",
            admin:{
                readOnly:true,
                description:"You cannot create products until you submit your Stripe details"
            },
        },

    ],

};