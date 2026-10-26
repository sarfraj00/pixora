import { api } from '../../config/axios.js'
import { useState } from "react";
import {
  LogOut,
  Trash2,
  X,
  ShieldAlert,
} from "lucide-react";

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const AccountActions = ({}) => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate()
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onLogout = async () => {
    setLogoutLoading(true);
    try {
      const res = await api.get('/auth/logout');
      if (res.status === 200) {
        toast.success('Logged out successfully.');
        navigate('/');
      }
    }
    catch (err) {
      toast.error('something went wrong! please try again.')
    }
    finally {
      setLogoutLoading(false);
    }
  }

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await api.get('/auth/delete-account');
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate('/')
      }
    }
    catch (err) {
   
      toast.error('something went wrong! please try again.')
    }
    finally {
      setDeleteLoading(false);
    }
  };

  const closeModal = () => {
    if (deleteLoading) return;

    setShowDeleteModal(false);

  };

  return (
    <>
      <section className="rounded-3xl border
        border-white/[0.07]
        bg-[#090916]/70 p-5 sm:p-6 text-zinc-400">
        <div className="mb-6 text-zinc-300">
          <h2 className="text-lg font-bold">Account actions</h2>
          <p className="mt-1 text-sm text-base-content/50">
            Manage your Pixora account.
          </p>
        </div>

        <div className="space-y-7">

          <button
            type="button"
            onClick={onLogout}
            disabled={logoutLoading || deleteLoading}
            className="
              flex w-full items-center gap-4
              rounded-2xl border border-base-content/10
             p-1.5 sm:p-4 text-left transition
              hover:border-primary/30 hover:bg-base-200/50
              disabled:opacity-50
            "
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LogOut size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold">
                {logoutLoading ? "Logging out..." : "Log out"}
              </p>
              <p className="mt-1 text-sm text-base-content/50">
                Sign out of your Pixora account on this device.
              </p>
            </div>

            {logoutLoading && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </button>


          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            disabled={logoutLoading || deleteLoading}
            className="
              flex w-full items-center gap-4
              rounded-2xl border border-error/20
              p-1.5 sm:p-4 text-left transition
              hover:border-error/40 hover:bg-error/5
              disabled:opacity-50
            "
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-error/10 text-error">
              <Trash2 size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-error">
                Delete account
              </p>
              <p className="mt-1 text-sm text-base-content/50">
                Permanently delete your account and its associated data.
              </p>
            </div>
          </button>
        </div>
      </section>

      {showDeleteModal && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm border
        border-white/[0.07] text-zinc-400
      "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            aria-describedby="delete-description"
            className="w-full max-w-md overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 shadow-2xl"
          >

            <div className="flex items-center justify-between p-5 pb-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-error/10 text-error">
                <ShieldAlert size={25} />
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={deleteLoading}
                aria-label="Close confirmation"
                className="btn btn-ghost btn-sm btn-circle"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-5">
              <h3 id="delete-title" className="text-xl font-bold">
                Are you sure you want to delete your account?
              </h3>

              <p
                id="delete-description"
                className="mt-3 text-sm leading-6 text-base-content/60"
              >
                This action may permanently remove your Pixora profile,
                posts, comments, and other associated data. You may not
                be able to recover them.
              </p>

            </div>

            <div className="flex gap-3 border-t border-base-content/10 p-5 flex-row">
              <button
                type="button"
                onClick={closeModal}
                disabled={deleteLoading}
                className="btn btn-ghost flex-1 rounded-xl"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={
                  deleteLoading ||
                  logoutLoading
                }
                className="btn btn-error flex-1 rounded-xl flex items-center gap-0.5"
              >
                {deleteLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Delete account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountActions;
