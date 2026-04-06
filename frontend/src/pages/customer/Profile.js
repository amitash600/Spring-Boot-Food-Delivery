import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";
import axios from "axios";

const Profile = () => {
  const { user, updateUser, isAdmin } = useAuth();
  const { showSuccess, showError, showInfo } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    emailId: "",
    contactNumber: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      console.log("Profile component - user:", user);
      console.log("Profile component - isAdmin:", isAdmin);

      // For admin users, use AuthContext data directly since profile API might not work
      if (isAdmin) {
        console.log("👤 Using AuthContext data for admin profile");
        console.log("👤 Admin user object keys:", Object.keys(user));
        console.log("👤 Admin user data:", user);

        // Map admin user fields to expected profile fields
        const mappedProfileData = {
          customerId: user.customerId || user.id,
          customerName:
            user.customerName || user.name || user.username || "Admin User",
          emailId: user.emailId || user.email || "admin@fooddelivery.com",
          contactNumber: user.contactNumber || user.phone || "9876543210",
          address: user.address || "Admin Office, Mumbai",
          username: user.username || "admin",
          role: user.role || "ADMIN",
        };

        console.log("👤 Mapped profile data:", mappedProfileData);

        setProfileData(mappedProfileData);
        setFormData({
          customerName: mappedProfileData.customerName,
          emailId: mappedProfileData.emailId,
          contactNumber: mappedProfileData.contactNumber,
          address: mappedProfileData.address,
        });
      } else {
        // For customers, try to fetch from API
        fetchProfileData();
      }
    }
  }, [user, isAdmin]);

  const fetchProfileData = async () => {
    try {
      console.log("🔍 Fetching profile data...");
      console.log("📍 User object:", user);
      console.log("📍 User role:", user?.role);
      console.log("📍 Is Admin:", isAdmin);
      console.log("📍 API URL: http://localhost:8080/api/customer/profile");
      console.log("🔑 Token:", localStorage.getItem("token"));

      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/api/customer/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.log("✅ Profile response status:", response.status);
      console.log("✅ Profile response:", response.data);
      console.log("✅ Profile data:", response.data.data);

      const customerData = response.data.data;
      if (customerData) {
        setProfileData(customerData);
        setFormData({
          customerName: customerData.customerName || "",
          emailId: customerData.emailId || "",
          contactNumber: customerData.contactNumber || "",
          address: customerData.address || "",
        });
      } else {
        throw new Error("No profile data received");
      }
    } catch (error) {
      console.error("❌ Error fetching profile data:", error);
      console.error("❌ Error response:", error.response?.data);
      console.error("❌ Error status:", error.response?.status);
      console.error("❌ Error message:", error.message);

      // Fallback to auth context data
      console.log("⚠️ Using fallback data from AuthContext");
      if (user) {
        setProfileData(user);
        setFormData({
          customerName: user.customerName || "",
          emailId: user.emailId || "",
          contactNumber: user.contactNumber || "",
          address: user.address || "",
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Real API call to update profile
      const response = await axios.put(
        `http://localhost:8080/api/customer/profile`,
        {
          customerName: formData.customerName,
          address: formData.address,
          contactNumber: formData.contactNumber,
        },
      );

      console.log("Profile update response:", response.data);

      if (response.data.statusCode === 200) {
        // Update local state with the response data
        const updatedUser = response.data.data;
        setProfileData(updatedUser);
        updateUser(updatedUser);
        setIsEditing(false);
        showSuccess("Profile updated successfully!");
      } else {
        showError("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original profile data
    if (profileData) {
      setFormData({
        customerName: profileData.customerName || "",
        emailId: profileData.emailId || "",
        contactNumber: profileData.contactNumber || "",
        address: profileData.address || "",
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please login to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {isAdmin ? "Admin Profile" : "My Profile"}
                </h1>
                <p className="text-primary-100 mt-1">
                  {isAdmin
                    ? "Manage admin account information"
                    : "Manage your account information"}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-white text-primary-600 rounded-md hover:bg-primary-50 transition-colors duration-200"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex items-center px-4 py-2 bg-white text-primary-600 rounded-md hover:bg-primary-50 transition-colors duration-200 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="customerName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="emailId"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        type="email"
                        id="emailId"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contactNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        pattern="[0-9]{10}"
                        placeholder="1234567890"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Address
                    </label>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-2.5" />
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Account Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Full Name
                      </label>
                      <p className="text-gray-900">
                        {profileData?.customerName || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Username
                      </label>
                      <p className="text-gray-900">
                        {profileData?.username || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Email Address
                      </label>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <p className="text-gray-900">
                          {profileData?.emailId || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Phone Number
                      </label>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <p className="text-gray-900">
                          {profileData?.contactNumber || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Address
                      </label>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                        <p className="text-gray-900">
                          {profileData?.address || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Email Notifications</span>
                    <button className="text-primary-600 hover:text-primary-700 text-sm">
                      Configure
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Password</span>
                    <button className="text-primary-600 hover:text-primary-700 text-sm">
                      Change Password
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Order History</span>
                    {!isAdmin && (
                      <a
                        href="/orders"
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        View Orders
                      </a>
                    )}
                    {isAdmin && (
                      <a
                        href="/admin/orders"
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        Manage Orders
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
