
import Container from "../../components/global/Container";
import Footer from "../../components/global/footer";
import MyPosts from "../../components/profile/MyPosts";
import UserDetails from "../../components/profile/UserDetails";

const Profile = () => {
    return (
        <div className="min-h-screen">
            <div className="min-h-[30vh] bg-gradient-to-r from-blue-500 to-grey-500 "></div>
            <Container className="py-0">
                <div className="h-full lg:w-8/12 mx-auto">
                    {/* USER DETAILS */}
                    <UserDetails />

                    {/* USER POST */}
                    <MyPosts />
                </div>
            </Container>
            <Footer/>
        </div>
    );
};

export default Profile;
