<script setup>
const props = defineProps({
  invitationData: {
    type: Object,
  },
  isPreview: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section class="w-full">
    <div
      v-if="props.isPreview"
      class="w-full flex flex-wrap justify-center gap-x-5 gap-y-20"
    >
      <ProfileCoupleInformation
        title="The Bride"
        image="/placeholder.webp"
        name="Hawa"
        child="Putri dari"
        parent="Bapak Lorem & Ibu Ipsum"
        social="@ea_invitation"
        social-link="https://instagram.com/ea_invitatiton"
        posts="1"
        followers="999"
        following="666"
      />
      <ProfileCoupleInformation
        title="The Groom"
        image="/placeholder.webp"
        name="Adam"
        child="Putra dari"
        parent="Bapak Lorem & Ibu Ipsum"
        social="@ea_invitation"
        social-link="https://instagram.com/ea_invitatiton"
        posts="1"
        followers="999"
        following="666"
      />
    </div>
    <div v-else class="w-full flex flex-wrap justify-center gap-x-5 gap-y-20">
      <ProfileCoupleInformation
        title="The Bride"
        :image="props.invitationData.bride.photo_url || '/placeholder.webp'"
        :name="props.invitationData.bride.full_name"
        child="Putri dari"
        :parent="`Bapak ${props.invitationData.bride.father} & Ibu ${props.invitationData.bride.mother}`"
        :social="`@${props.invitationData.bride.instagram}`"
        :social-link="`https://instagram.com/${props.invitationData.bride.instagram}`"
        posts="1"
        followers="999"
        following="666"
      />
      <ProfileCoupleInformation
        title="The Groom"
        :image="props.invitationData.groom.photo_url || '/placeholder.webp'"
        :name="props.invitationData.groom.full_name"
        child="Putra dari"
        :parent="`Bapak ${props.invitationData.groom.father} & Ibu ${props.invitationData.groom.mother}`"
        :social="`@${props.invitationData.groom.instagram}`"
        :social-link="`https://instagram.com/${props.invitationData.groom.instagram}`"
        posts="1"
        followers="999"
        following="666"
      />
    </div>
  </section>
</template>
