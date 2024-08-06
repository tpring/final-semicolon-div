import OAuthLoginStatus from '../../(auth)/_components/OAuthLoginStatus';
import ProfileContent from '../_components/ProfileContent';
import ProfileSetting from '../_components/ProfileSetting';
import DeleteAccountButton from '../_components/setting/DeleteAccountButton';

const ProfilePage = () => {
  return (
    <div>
      <ProfileSetting />
      {/* <ProfileContent /> */}
      <DeleteAccountButton />
      <OAuthLoginStatus />
    </div>
  );
};

export default ProfilePage;
