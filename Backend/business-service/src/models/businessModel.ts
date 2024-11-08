import mongoose, { Document, Schema } from 'mongoose';

interface IBusiness extends Document {
    businessOrganizationName: string;
    businessDescription: string;
    businessUniqueId: string;
}

const businessSchema = new Schema<IBusiness>(
    {
      businessOrganizationName: {
        type: String,
        required: true,
      },
      businessDescription: {
        type: String,
        required: true,
      },
      businessUniqueId:{
          type: String,
          required: true,
      },
    },
    { timestamps: true }
  );

const Business = mongoose.model<IBusiness>('Business', businessSchema);
export default Business;