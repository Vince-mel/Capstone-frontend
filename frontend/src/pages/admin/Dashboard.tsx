import AdminCard from "../../components/admin/AdminCard";
import Container from "../../components/global/Container";
import images from "../../constants/images";
import {  ACTIVITY, CATEGORY, DASHBOARD, HOME, USERS } from "../../constants/routes";
const Dashboard = () => {
    return (
        <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-24">
                <AdminCard src={images.users} title="Utenti" link={`${USERS}`} />
                <AdminCard src={images.home} title="Home" link={`${HOME}`} />
                <AdminCard
                    src={images.category}
                    title="Categorie"
                    link={ CATEGORY}
                />
                <AdminCard
                    src={images.activity}
                    title="ATTIVITÀ"
                    link={ACTIVITY}
                />
            </div>
        </Container>
    );
};

export default Dashboard;
