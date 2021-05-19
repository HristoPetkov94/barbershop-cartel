package com.barbershop.cartel.general.config.socialmedia.service;

import com.barbershop.cartel.general.config.socialmedia.entity.SocialMediaEntity;
import com.barbershop.cartel.general.config.socialmedia.interfaces.SocialMediaInterface;
import com.barbershop.cartel.general.config.socialmedia.model.SocialMediaModel;
import com.barbershop.cartel.general.config.socialmedia.repository.SocialMediaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SocialMediaService implements SocialMediaInterface {

    final ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private SocialMediaRepository socialMediaRepository;

    @Override
    public SocialMediaModel getSocialMedia() {

        SocialMediaEntity media = socialMediaRepository.findAll().iterator().next();

        return modelMapper.map(media, SocialMediaModel.class);
    }

    @Override
    public void saveSocialMedia(SocialMediaModel socialMedia) {
        Iterable<SocialMediaEntity> media = socialMediaRepository.findAll();

        boolean isEmpty = !media.iterator().hasNext();

        SocialMediaEntity socialMediaRecord;

        if (isEmpty) {
            socialMediaRecord = new SocialMediaEntity();
        }
        else {
            socialMediaRecord = media.iterator().next();
        }

        socialMediaRecord.setFacebook(socialMedia.getFacebook());
        socialMediaRecord.setInstagram(socialMedia.getInstagram());

        socialMediaRepository.save(socialMediaRecord);
    }
}
