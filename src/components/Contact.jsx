import React from 'react'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import MessageToaster from './Toaster'
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {

    const form = useRef();
    const [result, setResult] = React.useState("")
    const [toastType, setToastType] = React.useState("")


    // Submit form data to backend
    const sendEmail = async (e) => {
        e.preventDefault();

        if (!form.current) return;

        const formData = {
            name: form.current.name.value,
            address: form.current.address.value,
            phone: form.current.mobile.value,
            subject: form.current.subject.value,
            message: form.current.message.value,
        };

        // Show loading toast
        const sendingToastId = toast.loading("Sending...");

        try {
            const res = await fetch(" // backend URL", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            toast.dismiss(sendingToastId);

            if (res.ok) {
                setResult("Message sent successfully!");
                setToastType("success");
                toast.success("Message sent successfully!");
                form.current.reset();
            } else {
                setResult("Something went wrong. Please try again.");
                setToastType("error");
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            toast.dismiss(sendingToastId);
            setResult("Failed to connect to server.");
            setToastType("error");
            toast.error("Failed to connect to server.");
            console.error("❌ Error:", error);
        }
    };

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-200 to-blue-500 relative" >


            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Call and Message Me for any Question or Booking
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Let's Connect</h3>
                        <p className="text-gray-600 mb-8 text-lg">
                            At Shree Vinayak Fabrication, we specialize in high-quality welding and custom metalwork. every project is crafted with precision, strength, and attention to detail.
                        </p>

                        <div className="space-y-6">
                            {/* Email Section */}
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-600 rounded-lg">
                                    <Mail className="text-white" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Email</h4>
                                    <a href="mailto:ajaywelder9352@gmail.com" className="text-gray-600 hover:underline">
                                        ajaywelder9352@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Phone Section */}
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-purple-600 rounded-lg">
                                    <Phone className="text-white" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Phone</h4>
                                    <a href="tel:+919352391913" className="text-gray-600 hover:underline">
                                        +91 9352391913
                                    </a>
                                </div>
                            </div>

                            {/* Location Section */}
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-green-600 rounded-lg">
                                    <MapPin className="text-white" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Location</h4>
                                    <a
                                        href="https://maps.app.goo.gl/wDPNd8vmBghreMAW9"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:underline"
                                    >
                                        Raja Rao Tularam Chauk, Bhiwadi, Alwar
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="bg-slate-300 rounded-xl shadow-lg p-8">

                        <MessageToaster message={result} type={toastType} />

                        <form onSubmit={sendEmail} ref={form} className="space-y-6">
                            {/* name  */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2"> Name </label>
                                <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200" placeholder="Your Name" />
                            </div>


                            {/* address  */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2"> Address </label>
                                <input type="text" id="address" name="address" required placeholder="Enter your address" className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200" />
                            </div>



                            {/* mobile */}
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2"> Mobile No </label>
                                <input type="tel" id="mobile" name="mobile" required placeholder="+91 0000000000" className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200"
                                />
                            </div>

                            {/* subject  */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input type="text" id="subject" className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200" placeholder="Subject" name='subject' required />
                            </div>

                            {/* message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2"> Message</label>
                                <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200 resize-none" placeholder="Enter your message We will contact you soon !" />
                            </div>

                            {/* submit button  */}
                            <button type="submit" className="w-full bg-gradient-to-r bg-slate-400 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2" >
                                <span>Send Message</span>
                                <Send size={20} />
                            </button>
                            {result && <p className="mt-4 text-center text-base text-green-600">{result}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section >
    )
}


export default Contact;