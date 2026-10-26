import {
  UserRound,
} from "lucide-react";
import { useSelector } from 'react-redux'
import defaultAvatar from '../../assets/images/defaultAvatar.png'

const AccountInformation = ({}) => {

  const userData = useSelector(state => state.userData);
 
  const fields = [
    {
      label: "Full Name",
      value: userData?.fullName,
      key: "name",
    },
    {
      label: "Username",
      value: `@${userData?.userName}`,
      key: "username",
    },
    {
      label: "Bio",
      value: userData?.profile?.bio,
      key: "bio",
    },
    {
      label: "Email",
      value: userData?.email,
      key: "email",
    },

  ];

  return (
    <section
      className="
        rounded-2xl
        border
        border-white/[0.07]
        bg-[#090916]/70
        p-5
        sm:p-7
      "
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-violet-500/10
            text-violet-400
          "
        >
          <UserRound size={23} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Account Information
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            View and update your account details.
          </p>
        </div>
      </div>

      {/* Profile photo */}
      <div
        className="
          mt-8
          flex
          flex-col
          gap-4
          border-b
          border-white/6
          pb-6
          sm:flex-row
          sm:items-center
        "
      >
        <p className="w-45 text-sm font-medium text-zinc-300">
          Profile Photo
        </p>

        <div className="flex items-center gap-4">
          <img
            src={userData?.profile?.avatarUrl || defaultAvatar}
            alt={userData?.fullnName}
            className="
              h-16
              w-16
              rounded-full
              border-2
              border-violet-500/50
              object-cover
            "
          />

        
        </div>
      </div>

   
      <div className="mt-2">
        {fields.map((field) => {

          if (field.label === 'Bio' && field.value === "") return;

          return <button
            key={field.key}
         
            className="
              group
              flex
              min-h-14.5
              w-full
              items-center
              gap-4
              border-b
              border-white/6
              text-left
              transition
              last:border-b-0
              hover:bg-white/2
            "
          >
            <span className="w-45 shrink-0 text-sm text-zinc-500">
              {field.label}
            </span>

            <span
              className={`
                flex-1
                wrap-break-word
                text-ellipsis
                overflow-hidden
                text-sm
                ${field.link
                  ? "text-violet-400"
                  : "text-zinc-200"
                }
              `}
            >
              {field.value}
            </span>
          </button>
        })}
      </div>
    </section>
  );
};

export default AccountInformation;