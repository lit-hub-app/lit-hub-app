import { Schema, models, model} from 'mongoose';

interface Settings {
    language: string;
    font: string;
    fontSize: number;
    offlineEnabled: boolean;
    userID: Schema.Types.ObjectId;
}

const SettingsSchema = new Schema<Settings>({
    language: {
        type: String,
        default: 'English'
    },
    font: {
        type: String,
        default: 'Times'
    },
    fontSize: {
        type: Number,
        default: 24
    },
    offlineEnabled: {
        type: Boolean,
        default: false
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Settings = models.Settings || model('Settings', SettingsSchema);

export default Settings;