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
            name:"razorpayAccountId",
            type:"text",
            required:false,
            admin:{
                readOnly:false,
            },
        },
        {
            name:"razorpayDetailsSubmitted",
            type:"checkbox",
            admin:{
                readOnly:false,
                description:"You cannot create products until you submit your Stripe details"
            },
        },

    ],

};