export default UserModel = (mongoose) => {
    const UserSchema = new mongoose.Schema(
      {
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        profilePicture: String, // image link stored using AWS S3
        university: String,
        major: String,
        metadata: Array,
      },
      { timestamps: true }
    );
    return mongoose.model("User", UserSchema);
  };